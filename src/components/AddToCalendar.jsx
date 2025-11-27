/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, CalendarPlus2 } from "lucide-react";
import { SiGooglecalendar, SiApple } from "react-icons/si";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";

// Utility to format dates for ICS and providers
const formatDateForLink = (date) =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

// Detect preferred calendar provider from browser/device
const detectPreferredProvider = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|macintosh/.test(ua)) return "apple";
  if (/android/.test(ua)) return "google";
  if (/windows/.test(ua) && /outlook/.test(ua)) return "outlook";
  if (/windows/.test(ua)) return "outlook";
  return "google"; // Default
};

export default function AddToCalendarDropdown({
  title,
  start,
  end,
  location,
  description,
  recurrenceRule = null, // e.g., "FREQ=WEEKLY;COUNT=10"
}) {
  const startDate = formatDateForLink(new Date(start));
  const endDate = formatDateForLink(new Date(end));

  // Provider URLs
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;

  const outlookUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(description)}&startdt=${new Date(
    start
  ).toISOString()}&enddt=${new Date(
    end
  ).toISOString()}&location=${encodeURIComponent(location)}`;

  const yahooUrl = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(
    title
  )}&st=${startDate}&et=${endDate}&desc=${encodeURIComponent(
    description
  )}&in_loc=${encodeURIComponent(location)}`;

  const downloadICS = () => {
    const rruleLine = recurrenceRule ? `RRULE:${recurrenceRule}\n` : "";
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${startDate}
DTEND:${endDate}
LOCATION:${location}
DESCRIPTION:${description}
${rruleLine}END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, "_")}.ics`;
    link.click();
  };

  // Provider order preference
  const sortedProviders = useMemo(() => {
    const preferred = detectPreferredProvider();
    const providers = [
      {
        name: "Google Calendar",
        icon: <SiGooglecalendar />,
        action: () => window.open(googleUrl, "_blank"),
        key: "google",
      },
      {
        name: "Outlook Online",
        icon: <PiMicrosoftOutlookLogo />,
        action: () => window.open(outlookUrl, "_blank"),
        key: "outlook",
      },
      {
        name: "Yahoo Calendar",
        icon: <CalendarPlus2 />,
        action: () => window.open(yahooUrl, "_blank"),
        key: "yahoo",
      },
      {
        name: "Apple / Outlook Desktop",
        icon: <SiApple />,
        action: downloadICS,
        key: "apple",
      },
    ];
    return [
      ...providers.filter((p) => p.key === preferred),
      ...providers.filter((p) => p.key !== preferred),
    ];
  }, [googleUrl, outlookUrl, yahooUrl]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarIcon size={18} /> Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortedProviders.map((provider) => (
          <DropdownMenuItem
            key={provider.key}
            onClick={provider.action}
            className="flex items-center gap-2"
          >
            {provider.icon} {provider.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
