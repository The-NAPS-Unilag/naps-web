import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Search from "../assets/images/upcomingEventsIcons/Search.png";
import Filter from "../assets/images/upcomingEventsIcons/Filter.png";
import Location from "../assets/images/upcomingEventsIcons/Location.png";
import CalendarDots from "../assets/images/upcomingEventsIcons/CalendarDots.png";
import Time from "../assets/images/upcomingEventsIcons/Time.png";
import {
  CheckCircle2,
  Plus,
  Users,
  
} from "lucide-react";
import UpcomingSmall1 from "../assets/images/upcomingSmall1.png";
import UpcomingSmall2 from "../assets/images/upcomingSmall2.png";
import ArrowBack from "../assets/images/upcomingEventsIcons/ArrowBack.png";
import SadFace from "../assets/images/upcomingEventsIcons/SadFace.png";
import CircularProgress from "@mui/material/CircularProgress";
import { GetEvents, GetUserRsvps, RSVPEvent, CancelRSVP } from "../apiCalls/events";
import { useNavigate } from "react-router-dom";
import AddToCalendarDropdown from "../components/AddToCalendar";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Placeholder images for events without images
  const placeholderImages = [UpcomingSmall1, UpcomingSmall2];

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Format time for display
  const formatTime = (timeStr) => {
    if (!timeStr) return "TBD";
    try {
      const [hours, minutes] = timeStr.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return timeStr;
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const [eventsResponse, rsvpsResponse] = await Promise.all([
          GetEvents(),
          GetUserRsvps(),
        ]);

        const rsvpIds = new Set();
        if (rsvpsResponse?.data?.events) {
          rsvpsResponse.data.events.forEach((event) => {
            if (event?.id) {
              rsvpIds.add(event.id);
            } else if (event?.event_id) {
              rsvpIds.add(event.event_id);
            }
          });
        }

        if (eventsResponse?.data) {
          const events = Array.isArray(eventsResponse.data)
            ? eventsResponse.data
            : [];
          const formattedEvents = events.map((event, index) => ({
            id: event.id,
            name: event.name,
            description: event.description || "",
            date: formatDate(event.date),
            rawDate: event.date,
            time: formatTime(event.time),
            rawTime: event.time,
            location: event.location || "TBD",
            type: event.event_type || "seminar",
            capacity: event.capacity,
            rsvp_count: event.rsvp_count || 0,
            is_open_for_registration: event.is_open_for_registration,
            added:
              typeof event.user_has_rsvpd === "boolean"
                ? event.user_has_rsvpd
                : rsvpIds.has(event.id),
            image: event.image_url || placeholderImages[index % 2],
          }));
          setEventData(formattedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const typeColors = {
    seminar: "bg-blue-100 text-blue-700",
    tutorial: "bg-yellow-100 text-yellow-700",
    social: "bg-pink-100 text-pink-700",
  };

  const typeColors2 = {
    seminar: "bg-blue-700",
    tutorial: "bg-yellow-700",
    social: "bg-pink-700",
  };

  const handleRSVP = async (id, e) => {
    e?.stopPropagation();
    const event = eventData.find((ev) => ev.id === id);
    if (!event || actionLoading === id) return;

    setActionLoading(id);
    try {
      if (event.added) {
        await CancelRSVP(id);
        const update = { added: false, rsvp_count: Math.max(0, event.rsvp_count - 1) };
        setEventData((prev) => prev.map((ev) => ev.id === id ? { ...ev, ...update } : ev));
        if (selectedEvent?.id === id) setSelectedEvent((prev) => ({ ...prev, ...update }));
      } else {
        await RSVPEvent(id);
        const update = { added: true, rsvp_count: event.rsvp_count + 1 };
        setEventData((prev) => prev.map((ev) => ev.id === id ? { ...ev, ...update } : ev));
        if (selectedEvent?.id === id) setSelectedEvent((prev) => ({ ...prev, ...update }));
      }
    } catch {
      // error shown by RSVPEvent/CancelRSVP via Swal
    } finally {
      setActionLoading(null);
    }
  };

  const getRsvpButtonProps = (event) => {
    const spotsLeft = event.capacity - event.rsvp_count;
    const isLoading = actionLoading === event.id;
    if (!event.is_open_for_registration)
      return { label: "Registration Closed", disabled: true, className: "w-full mt-2 bg-gray-100 text-gray-400 cursor-not-allowed border-0" };
    if (spotsLeft <= 0 && !event.added)
      return { label: "Event Full", disabled: true, className: "w-full mt-2 bg-gray-100 text-gray-400 cursor-not-allowed border-0" };
    if (event.added)
      return { label: isLoading ? "Cancelling…" : "Cancel RSVP", disabled: isLoading, className: "w-full mt-2 bg-white border border-red-300 text-red-500 hover:bg-red-50" };
    return { label: isLoading ? "Registering…" : "RSVP Now", disabled: isLoading, className: "w-full mt-2 bg-main text-white hover:opacity-90" };
  };

  const filteredEvents = eventData.filter((event) => {
    const searchLower = searchValue.toLowerCase();
    return (
      event.name.toLowerCase().includes(searchLower) ||
      event.date.toLowerCase().includes(searchLower) ||
      event.time.toLowerCase().includes(searchLower) ||
      event.type.toLowerCase().includes(searchLower)
    );
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (selectedEvent) {
    // Event detail view
    return (
      <div className="p-4">
        <p className="text-2xl md:text-[36px] font-GeneralSans-Semibold text-[#522374]">
          Upcoming Events
        </p>
        <div
          onClick={() => setSelectedEvent(null)}
          className="flex items-center mb-4 mt-6 cursor-pointer w-fit"
        >
          <img src={ArrowBack} className="mr-2" />
          Back
        </div>
        <div className="sm:flex sm:justify-between mt-4 sm:items-start">
          <h1 className="text-2xl font-GeneralSans-Medium mb-4 sm:mb-0">
            {selectedEvent.name}
          </h1>
          <div className="md:flex md:items-center md:space-x-2 space-y-2 md:space-y-0">
            {(() => {
              const btn = getRsvpButtonProps(selectedEvent);
              return (
                <Button
                  onClick={(e) => handleRSVP(selectedEvent.id, e)}
                  disabled={btn.disabled}
                  className={btn.className.replace("w-full mt-2 ", "")}
                >
                  {btn.label}
                </Button>
              );
            })()}
            <AddToCalendarDropdown
              title={selectedEvent.name}
              start={selectedEvent.rawDate ? `${selectedEvent.rawDate}T${selectedEvent.rawTime || "00:00:00"}` : new Date().toISOString()}
              end={selectedEvent.rawDate ? `${selectedEvent.rawDate}T${selectedEvent.rawTime || "01:00:00"}` : new Date().toISOString()}
              location={selectedEvent.location}
              description={selectedEvent.description}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-2 sm:flex sm:space-x-4 mt-4 mb-6 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <img src={CalendarDots} />
            <span>{selectedEvent.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src={Location} />
            <span>{selectedEvent.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src={Time} />
            <span>{selectedEvent.time}</span>
          </div>
          <span
            className={`w-fit text-xs px-2 py-1 capitalize flex items-center space-x-1 rounded-full ${
              typeColors[selectedEvent.type]
            }`}
          >
            <div
              className={`h-2 w-2 inline-block mr-[2px] rounded-full ${
                typeColors2[selectedEvent.type]
              }`}
            />
            <span>{selectedEvent.type}</span>
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1 px-2 py-1">
            <Users size={13} />
            {selectedEvent.rsvp_count}/{selectedEvent.capacity} registered
          </span>
          {selectedEvent.added && (
            <span className="text-xs bg-green-100 flex items-center space-x-1 text-green-700 px-2 py-1 rounded-full">
              <CheckCircle2 size={14} />
              <span>RSVP&apos;d</span>
            </span>
          )}
        </div>
        <img
          src={selectedEvent.image}
          alt={selectedEvent.name}
          className="w-full h-48 md:h-[300px] object-cover rounded-lg"
        />
        <div className=" mt-4">
          <p className="font-GeneralSans-Medium">About</p>

          <p className="text-gray-600">{selectedEvent.description}</p>
        </div>
      </div>
    );
  }

  // Main event list view
  return (
    <div>
      <div className="flex items-center justify-between mb-0">
        <p className="text-xl md:text-[36px] font-GeneralSans-Semibold text-[#522374]">
          Upcoming Events
        </p>
        <button
          onClick={() => navigate('/upcoming-events/propose')}
          className="flex items-center gap-2 bg-[#522374] text-white text-sm font-GeneralSans-Medium px-3 py-2 md:px-4 md:py-2.5 rounded-xl hover:bg-[#3d1a57] transition-colors shrink-0"
        >
          <Plus size={15} />
          Propose Event
        </button>
      </div>
      <div className="w-full mt-10">
        <div className="sm:flex sm:justify-between sm:space-x-2 sm:space-y-0 space-y-2 w-full">
          <div className="w-full border border-gray-300 px-4 rounded-md relative flex items-center space-x-2">
            <img src={Search} width={20} alt="search" />
            <Input
              type="text"
              id="search"
              value={searchValue}
              className="w-full h-10 bg-transparent border-0 ring-0 focus-visible:ring-0"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for Event by Name, Tags, Date and Time"
            />
          </div>
          <div className="w-fit border border-gray-300 py-2 px-4 rounded-md flex items-center">
            <img src={Filter} width={20} alt="filter" />
            <div className="w-max mx-4">
              <p className="w-max">Filter Search</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="border rounded-lg p-4 shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
            >
              <img
                src={event.image}
                alt={event.name}
                className="h-36 md:h-[180px] w-full object-cover rounded-md"
              />
              <p className="font-GeneralSans-Medium mt-3">{event.name}</p>
              <div className="flex justify-between items-center text-sm text-gray-600 mt-2 space-x-4">
                <div className="flex items-center space-x-1">
                  <img src={CalendarDots} className="" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <img src={Time} className="" />
                  <span>{event.time}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                <span
                  className={`text-xs px-2 py-1 capitalize rounded-full ${
                    typeColors[event.type] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div
                    className={`h-2 w-2 inline-block mr-[2px] rounded-full ${
                      typeColors2[event.type] || "bg-gray-500"
                    }`}
                  />{" "}
                  {event.type}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Users size={12} />
                  {event.rsvp_count}/{event.capacity}
                  {event.capacity - event.rsvp_count > 0 && !event.added && (
                    <span className="text-gray-400">· {event.capacity - event.rsvp_count} left</span>
                  )}
                  {event.added && (
                    <span className="text-green-600 flex items-center gap-0.5 ml-1">
                      <CheckCircle2 size={12} /> RSVP&apos;d
                    </span>
                  )}
                </span>
              </div>
              {(() => {
                const btn = getRsvpButtonProps(event);
                return (
                  <Button
                    onClick={(e) => handleRSVP(event.id, e)}
                    disabled={btn.disabled}
                    className={btn.className}
                  >
                    {btn.label}
                  </Button>
                );
              })()}

              <AddToCalendarDropdown
                title={event.name}
                start={event.rawDate ? `${event.rawDate}T${event.rawTime || "00:00:00"}` : new Date().toISOString()}
                end={event.rawDate ? `${event.rawDate}T${event.rawTime || "01:00:00"}` : new Date().toISOString()}
                location={event.location}
                description={event.description}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center">
            <img src={SadFace} className="" />
            <p className="text-main_grey font-GeneralSans-Medium mt-4 text-xl text-center">
              {eventData.length > 0
                ? "Sorry, no results for that, try another keyword or tag "
                : "Sorry, there are no events at the moment"}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default UpcomingEvents;
