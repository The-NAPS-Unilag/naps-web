function DashboardChild ({ title, className, children, borderColour, src, alt }) {
    return (
        <>
            <div className={`flex flex-col gap-4 border-[0.5px] p-4 rounded-lg mb-4 md:h-[231px] ${className}`}>
                <div className={`flex gap-3 pb-2 border-b ${borderColour}`}>
                    <img src={src} alt={alt} />
                    <p className="text-base font-GeneralSans-Semibold">{title}</p>
                </div>
            
                
                {children}
            </div>          
        </>
    )
}

export default DashboardChild