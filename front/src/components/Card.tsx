type CardElement = {
    img: string;
    alt_img?: string;
    img_button: string;
    description: string;
    title: string;
    list_badge: string[];
    button_link: string;
}

function Card(elements: CardElement) {
    const badges = elements.list_badge.map((badge, index) =>
        <div
            key={`${badge}-${index}`}
            className="badge badge-sm gap-2 border border-white/15 bg-base-300/40 px-3 text-base-content/80 backdrop-blur-md shadow-[0_0_16px_rgba(148,163,184,0.18)]">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-200/80" />
            {badge}
        </div>
    )
    
    return (
        
        <div className="card relative min-h-130 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-slate-900/60 via-slate-950/45 to-black/55 text-base-100 shadow-[0_10px_45px_rgba(15,23,42,0.65)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_14px_55px_rgba(56,189,248,0.22)]">
                <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-indigo-300/10 blur-3xl" />
                <figure className="relative h-48 overflow-hidden border-b border-white/10">
                    <img
                    src={elements.img}
                    alt={elements.alt_img}
                    className="h-full w-full object-cover brightness-85 contrast-115 saturate-75 hue-rotate-15" />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-slate-950/10 to-cyan-200/10" />
                </figure>
                <div className="card-body relative gap-4">
                    <h2 className="card-title text-xl font-semibold tracking-wide text-slate-100"> {elements.title} </h2>
                        <p className="rounded-2xl border border-white/12 bg-slate-950/35 p-4 text-sm leading-relaxed text-slate-200/90 shadow-inner shadow-black/20">
                            {elements.description}
                        </p>
                        <div className="card-actions justify-start gap-2 flex-wrap">
                            {badges}
                        </div>
                    <div className="card-actions justify-end">
                        <a href={elements.button_link} target="_blank" rel="noopener noreferrer">
                            <button className="btn border border-white/15 bg-slate-200/10 text-slate-100 shadow-none backdrop-blur-md hover:bg-slate-200/20">
                                <img
                                src={elements.img_button}
                                alt="icon"
                                className="h-5 w-5 object-contain"
                                />
                            </button>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default Card;