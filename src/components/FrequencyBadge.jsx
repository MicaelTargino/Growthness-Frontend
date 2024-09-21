const FrequencyBadge = ({type}) => {
    const getFrequencyText = () => {
        switch(type) {
            case "daily":
                return "diário"
            case "weekly":
                return "semanal";
            case "monthly":
                return "monthly";
        }
    }

    return (
        <span className="font-boldest text-sm px-3 py-1 rounded-2xl bg-slate-400 shadow-lg uppercase text-slate-700">
            {getFrequencyText()}
        </span>
    )

}

export default FrequencyBadge;