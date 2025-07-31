function DashboardItem({ topic, details, btnValue}) {
    return(
        <div className="md:flex justify-between items-center">
            <div>
                <p className="text-xs font-GeneralSans-Medium">{topic}</p>
                <span className="text-[10px]">{details}</span>
            </div>

            <span className="text-xs hover:underline">{btnValue}</span>
        </div>
    )
}

export default DashboardItem