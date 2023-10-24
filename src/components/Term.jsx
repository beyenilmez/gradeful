function Term({dataid, name}) {
    return (
        <div data-id={dataid}
            class="class hover:cursor-pointer dark:bg-slate-750 bg-slate-250 border dark:border-slate-550 border-slate-350 shadow-lg rounded-md pb-1">

            <div class="flex items-center py-1 px-5">
                <div class="flex w-full h-full -ml-1">{name}</div>
                <div class="flex justify-end w-1/3">
                    <div class="flex justify-center mr-3 w-full">Avg</div>
                    <div class="flex justify-center mr-3 w-full">Ltr</div>

                    <div
                        class="max-w-fit w-[1000%] h-7 px-1.5 dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 rounded-lg hover:cursor-pointer transition-all transition-all duration-100 flex justify-center items-center">
                        <svg class="w-4 h-4 dark:fill-slate-300 fill-slate-700" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 45.402 45.402">
                            <path
                                d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Term;