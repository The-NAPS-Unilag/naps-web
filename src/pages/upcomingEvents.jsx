/* eslint-disable react/prop-types */
import { useState } from "react";
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
  // MinusIcon,
  // PlusIcon,
} from "lucide-react";
import UpcomingSmall1 from "../assets/images/upcomingSmall1.png";
import UpcomingSmall2 from "../assets/images/upcomingSmall2.png";
import ArrowBack from "../assets/images/upcomingEventsIcons/ArrowBack.png";
import SadFace from "../assets/images/upcomingEventsIcons/SadFace.png";
import UpcomingBig1 from "../assets/images/UpcomingBig1.png";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersUpdate } from "../apiCalls/user";
import AddToCalendarDropdown from "../components/AddToCalendar";

const UpcomingEvents = () => {
  const { user, setUser, login } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [details, setDetails] = useState(user);
  const [searchValue, setSearchValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null); // <-- for detail view

  const [eventData, setEventData] = useState([
    {
      id: 1,
      name: "NAPS Orientation for Freshers 2024/2025 Session",
      date: "May 10, 2025",
      time: "10:00 AM",
      location: "School Auditorium",
      type: "seminar",
      added: false,
      image: UpcomingSmall2,
      description:
        "Welcome to the Department of Psychology’s Orientation event! This is your first step into the fascinating world of psychology, and we are thrilled to have you with us. Whether you’re starting your journey as a psychology major or simply exploring your interests, this event is designed to introduce you to everything the department has to offer.\n\nDuring the orientation, you’ll get an overview of the department’s academic programs, research opportunities, and resources available to support your studies. You'll meet faculty members, current students, and advisors who will guide you through your time in the department. Additionally, we’ll provide insights into the various areas of psychology you can explore, from clinical and cognitive psychology to social and behavioral studies.\n\nGet ready for an exciting start to your academic adventure, and let’s set the stage for your success in understanding the mind, behavior, and everything in between!",
    },
    {
      id: 2,
      name: "Career Development Workshop",
      date: "May 12, 2025",
      time: "12:00 PM",
      location: "School Auditorium",
      type: "tutorial",
      added: true,
      image: UpcomingSmall1,
      description:
        "Unlock your professional potential at the Career Development Workshop. This interactive session is tailored for students seeking to gain clarity and confidence in their career paths. Whether you're exploring job options, preparing for internships, or refining your personal brand, this workshop offers practical tools and strategies to move you forward.\n\nParticipants will engage with career counselors, industry professionals, and alumni who will share insights on resume writing, interview skills, networking techniques, and effective job search practices. You’ll also explore how to leverage your academic experience and personal interests to build a fulfilling and impactful career. Come ready to learn, connect, and take charge of your future.",
    },
    {
      id: 3,
      name: "Departmental Welcome Hangout",
      date: "May 15, 2025",
      time: "04:00 PM",
      location: "School Auditorium",
      type: "social",
      added: false,
      image: UpcomingSmall2,
      description:
        "Start your semester on a lively note with the Departmental Welcome Hangout—a casual, fun-filled gathering aimed at helping new and returning students connect. It’s more than just a social event; it’s an opportunity to foster friendships, meet lecturers in an informal setting, and learn about student-led initiatives and groups within the department.\n\nExpect games, music, refreshments, and engaging conversations that make you feel part of a community. Whether you're an introvert, extrovert, or somewhere in between, this relaxed environment offers a great way to break the ice and enjoy the vibrant culture of our department.",
    },
    {
      id: 4,
      name: "Scholarship Interview Training",
      date: "May 18, 2025",
      time: "01:00 PM",
      location: "School Auditorium",
      type: "tutorial",
      added: false,
      image: UpcomingSmall1,
      description:
        "If you're planning to apply for scholarships, don't miss this essential training session. The Scholarship Interview Training is designed to help you prepare confidently and competently for competitive academic opportunities. This session will cover common interview questions, how to present your achievements persuasively, and how to articulate your academic and career goals effectively.\n\nYou’ll participate in mock interviews, receive personalized feedback, and hear from past scholarship recipients who will share their success strategies. It’s an empowering experience that sharpens your communication skills and enhances your chances of standing out among applicants.",
    },
    {
      id: 5,
      name: "Freshers Academic Bootcamp",
      date: "May 20, 2025",
      time: "09:00 AM",
      location: "School Auditorium",
      type: "seminar",
      added: true,
      image: UpcomingSmall2,
      description:
        "Join us for the Freshers Academic Bootcamp, an intensive but supportive program created to equip first-year students with the skills and habits needed for academic success. This event focuses on essential areas such as effective study techniques, time management, academic writing, and exam strategies.\n\nYou’ll be guided by experienced upperclassmen, tutors, and faculty who will share tips and resources that can make your academic transition smoother. Whether you’re feeling overwhelmed or simply eager to get ahead, this bootcamp is your chance to build confidence and set a strong foundation for the semester.",
    },
    {
      id: 6,
      name: "Sports and Games Weekend",
      date: "May 25, 2025",
      time: "03:00 PM",
      location: "School Auditorium",
      type: "social",
      added: false,
      image: UpcomingSmall1,
      description:
        "Unwind and recharge at the Sports and Games Weekend! This event is all about fostering camaraderie, encouraging physical fitness, and creating lasting memories through friendly competition. With a wide range of activities—from football and volleyball to board games and fun challenges—there’s something for everyone.\n\nBeyond the competition, the weekend promotes teamwork, school spirit, and stress relief. It’s a great opportunity to bond with your peers, showcase your athletic talents, or simply cheer from the sidelines and enjoy the good vibes. Come out, get active, and let the games begin!",
    },
  ]);

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

  const handleRSVP = (id) => {
    setEventData((prevData) =>
      prevData.map((event) =>
        event.id === id ? { ...event, added: !event.added } : event
      )
    );
  };

  const handleSave = async () => {
    setUser(details);
    let valid = false;
    handleOpen();
    const updateResponse = await UsersUpdate({
      current_level: details.curent_level,
      profile_picture: details?.profile_picture,
      bio: details.bio,
    });
    handleClose();
    if (updateResponse.status === 200) {
      valid = true;
    }
    if (valid) {
      login(updateResponse.data);
    }
  };

  const Alert = ({ children, action }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation(); // stop card click here
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
                setSelectedEvent((ev) => {
                  return { ...ev, added: !ev.added };
                });
              }}
            >
              <Button
                // onClick={}
                className=" flex items-center space-x-1 bg-main text-white"
              >
                {/* {selectedEvent.added ? <MinusIcon /> : <PlusIcon />} */}
                <span>
                  {selectedEvent.added ? "Already RSVP'd" : "RSVP Now"}
                </span>
              </Button>
            </Alert>
            <AddToCalendarDropdown
              title="Weekly Standup"
              start="2025-08-15T13:00:00Z"
              end="2025-08-15T14:00:00Z"
              location="Zoom"
              description="Our weekly project sync-up."
              recurrenceRule="FREQ=WEEKLY;COUNT=10"
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
          src={UpcomingBig1}
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
                  {/* {event.added ? <MinusIcon /> : <PlusIcon />} */}
                  <span>{event.added ? "Already RSVP'd" : "RSVP Now"}</span>
                </Button>
              </Alert>

              <AddToCalendarDropdown
                title="Weekly Standup"
                start="2025-08-15T13:00:00Z"
                end="2025-08-15T14:00:00Z"
                location="Zoom"
                description="Our weekly project sync-up."
                recurrenceRule="FREQ=WEEKLY;COUNT=10"
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
