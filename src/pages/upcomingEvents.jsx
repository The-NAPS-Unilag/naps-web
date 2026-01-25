/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "../context/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import Search from "../assets/images/upcomingEventsIcons/Search.png";
import Filter from "../assets/images/upcomingEventsIcons/Filter.png";
import Location from "../assets/images/upcomingEventsIcons/Location.png";
import CalendarDots from "../assets/images/upcomingEventsIcons/CalendarDots.png";
import Time from "../assets/images/upcomingEventsIcons/Time.png";
import {
  CheckCircle2,
} from "lucide-react";
import UpcomingSmall1 from "../assets/images/upcomingSmall1.png";
import UpcomingSmall2 from "../assets/images/upcomingSmall2.png";
import ArrowBack from "../assets/images/upcomingEventsIcons/ArrowBack.png";
import SadFace from "../assets/images/upcomingEventsIcons/SadFace.png";
import CircularProgress from "@mui/material/CircularProgress";
import { GetEvents, RSVPEvent, CancelRSVP } from "../apiCalls/events";
import AddToCalendarDropdown from "../components/AddToCalendar";

const UpcomingEvents = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const response = await GetEvents();
        if (response?.data) {
          const events = Array.isArray(response.data) ? response.data : [];
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
            added: false, // TODO: Backend should provide user_has_rsvpd field
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

  const handleRSVP = async (id) => {
    const event = eventData.find((e) => e.id === id);
    if (!event) return;

    handleOpen();
    try {
      if (event.added) {
        await CancelRSVP(id);
      } else {
        await RSVPEvent(id);
      }
      // Update local state after successful API call
      setEventData((prevData) =>
        prevData.map((e) =>
          e.id === id ? { ...e, added: !e.added } : e
        )
      );
      // Also update selected event if viewing detail
      if (selectedEvent?.id === id) {
        setSelectedEvent((prev) => ({ ...prev, added: !prev.added }));
      }
    } catch (error) {
      console.error("RSVP operation failed:", error);
    } finally {
      handleClose();
    }
  };

  const Alert = ({ children, action }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed to continue</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col">
            <AlertDialogAction asChild>
              <Button
                variant="ghost"
                onClick={(e) => action(e)}
                className="bg-main text-[18px] rounded-lg text-white w-full"
              >
                Proceed
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                size="default"
                className="text-main text-[18px] rounded-lg border border-main bg-white w-full"
              >
                Close
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
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
        <p className="text-[36px] font-GeneralSans-Semibold text-[#522374]">
          Upcoming Events
        </p>
        <div
          onClick={() => setSelectedEvent(null)}
          className="flex items-center mb-4 mt-10 cursor-pointer w-fit"
        >
          <img src={ArrowBack} className="mr-2" />
          Back
        </div>
        <div className="sm:flex sm:justify-between mt-4 sm:items-start">
          <h1 className="text-2xl font-GeneralSans-Medium mb-4 sm:mb-0">
            {selectedEvent.name}
          </h1>
          <div className="md:flex md:items-center md:space-x-2 space-y-2 md:space-y-0">
            <Alert
              action={() => {
                handleRSVP(selectedEvent.id);
              }}
            >
              <Button
                className=" flex items-center space-x-1 bg-main text-white"
              >
                <span>
                  {selectedEvent.added ? "Already RSVP'd" : "RSVP Now"}
                </span>
              </Button>
            </Alert>
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
          {selectedEvent.added && (
            <span className="text-xs bg-green-100 flex items-center space-x-1 text-green-700 px-2 py-1 rounded-full">
              <CheckCircle2 size={14} />
              <span>{"RSVP'd"}</span>
            </span>
          )}
        </div>
        <img
          src={'https://placehold.co/600x400.png'}
          alt={selectedEvent.name}
          className="w-full h-[300px] object-cover rounded-lg"
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
      <p className="text-[36px] font-GeneralSans-Semibold text-[#522374]">
        Upcoming Events
      </p>
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
                className="h-[180px] w-full object-cover rounded-md"
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
                    typeColors[event.type]
                  }`}
                >
                  <div
                    className={`h-2 w-2 inline-block mr-[2px] rounded-full ${
                      typeColors2[event.type]
                    }`}
                  />{" "}
                  {event.type}
                </span>
                {event.added && (
                  <span className="text-xs bg-green-100 flex items-center space-x-1 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle2 size={14} />
                    <span>{"RSVP'd"}</span>
                  </span>
                )}
              </div>
              <Alert
                action={() => {
                  handleRSVP(event.id);
                }}
              >
                <Button
                  onClick={(e) => e.stopPropagation()}
                  className=" flex items-center space-x-1 my-2 bg-main text-white"
                >
                  <span>{event.added ? "Already RSVP'd" : "RSVP Now"}</span>
                </Button>
              </Alert>

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

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default UpcomingEvents;
