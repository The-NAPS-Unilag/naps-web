import fileThumbnail from '../../assets/images/ResourceIcons/FileThumbnail.svg'
import dots from '../../assets/images/ResourceIcons/DotsThreeVertical.svg'

const formatFileSize = (bytes) => {
    if (!bytes && bytes !== 0) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < sizes.length - 1) {
        size /= 1024;
        unitIndex += 1;
    }
    return `${size.toFixed(size < 10 && unitIndex > 0 ? 1 : 0)} ${sizes[unitIndex]}`;
};

const LevelFile = ({ fileName, author, fileUrl, listView, fileType, fileSize }) => {
    
    const handleDownload = (e) => {
        e.stopPropagation();
        if (fileUrl) {
            window.open(fileUrl, '_blank');
        }
    };

    const metaParts = [];
    if (fileType) {
        metaParts.push(fileType.toUpperCase());
    }
    if (fileSize || fileSize === 0) {
        const sizeLabel = formatFileSize(fileSize);
        if (sizeLabel) metaParts.push(sizeLabel);
    }
    const metaLabel = metaParts.join(' • ');

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
                            {metaLabel && (
                                <p className={`text-xs text-gray-500 ${author && listView ? 'mt-0.5' : 'mt-1'}`}>
                                    {metaLabel}
                                </p>
                            )}
                        </div>
                        <img src={dots} alt="dots" className={`${listView ? 'mr-16' : ''} cursor-pointer`} />
                    </div>
            </div>
        </>
    )
}

export default LevelFile
