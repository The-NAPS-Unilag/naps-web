import fileThumbnail from '../../assets/images/ResourceIcons/FileThumbnail.svg'
import dots from '../../assets/images/ResourceIcons/DotsThreeVertical.svg'

const LevelFile = ({ fileName, author, fileUrl, listView }) => {
    
    const handleDownload = (e) => {
        e.stopPropagation();
        if (fileUrl) {
            window.open(fileUrl, '_blank');
        }
    };

    return (
        <>
            <div 
                onClick={handleDownload}
                className={`
                ${listView
                     ? 'w-full flex flex-row gap-3 p-4 text-sm max-h-16 items-center hover:bg-[#FFF3DB] cursor-pointer' 
                     : 'flex flex-col items-center justify-center w-28 h-[126px] gap-1 bg-[#EFF0F2] hover:bg-[#FFF3DB] py-1.5 px-3 rounded-lg cursor-pointer'}
                `}>
                    <div className={` flex items-center justify-center ${listView ? '' : 'w-20 h-20'}`}>
                        <img src={fileThumbnail} alt="fileThumbnail"  className={listView ? 'max-w-6 max-h-6' : 'w-[55px] h-[65px]'}/>
                    </div>
                    <div className={`flex flex-1 items-center w-20 ${listView ? 'justify-between' : 'justify-between'}`}>
                        <div className="flex flex-col">
                            <p className="text-base">{fileName}</p>
                            {author && listView && (
                                <p className="text-xs text-gray-500">by {author}</p>
                            )}
                        </div>
                        <img src={dots} alt="dots" className={`${listView ? 'mr-16' : ''} cursor-pointer`} />
                    </div>
            </div>
        </>
    )
}

export default LevelFile