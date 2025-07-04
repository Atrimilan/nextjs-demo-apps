import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy-data";
import EventList from "../../../components/events/event-list";
import ResultsTitle from "../../../components/events/results-title";
import Button from "../../../components/ui/button";
import ErrorAlert from "../../../components/ui/error-alert";

export default function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.eventDate;

    if (!filterData) {
        return <p className="center">Loading...</p>;
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (isNaN(numYear) || numYear < 2021 || numYear > 2030 ||
        isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter, please adjust your values.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show all events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show all events</Button>
                </div>
            </>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
}