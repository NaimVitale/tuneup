function CardSpotifySong() {
    return (
        <div className="bg-[#D9D9D9] flex justify-between rounded-2xl px-6 py-4 items-center">
            <div className="flex gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Red_Hot_Chili_Peppers_logo.png" alt="" className="h-10 w-10" />
                <div>
                    <p className="text-lg">Red Hot Chili Peppers</p>
                    <p className="text-sm">Soul To Squeeze</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <p>3:45</p>
                <img src="https://icons.veryicon.com/png/o/internet--web/web-video-clip/play-332.png" alt="" className="h-6 w-6" />
            </div>
        </div>
    )
}

export default CardSpotifySong