function DashboardRecentItem({ detail, time}) {
    return (
        <div className="md:flex justify-between text-xs">
            <p className="max-md:font-GeneralSans-Medium">{detail}</p>
            <span>{time}</span>
        </div>
    )
}

export default DashboardRecentItem