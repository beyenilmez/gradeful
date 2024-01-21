import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import React from "react";
import OutsideAlerter from "../utils/OutsideAlerter";

function Selector(props) {
    // <--- States start --->
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    // <--- States end --->

    // <--- Effects start --->

    useEffect(() => {
        if(open){
            setSearchValue("");
        }else{
            setSearchValue(selectedItem ? selectedItem.name : '');
        }
    }, [open])

    // <--- Effects end --->

    // <--- Functions start --->
    function select(item) {
        setSelectedItem(item);
        setOpen(false);

        setSearchValue(item.name);

        props.onSelect(item);
    }
    // <--- Functions end --->

    return (
        <div>
            <OutsideAlerter
                action={() => setOpen(false)}
            >
                <div>
                    <input type="text"
                        onFocus={() => setOpen(true)}
                        className={`p-2 rounded-r-none ${props.bgColor} ${props.className}`}
                        value={searchValue}
                        placeholder={selectedItem ? selectedItem.name : 'Select a preset...'}
                        onChange={(e) => setSearchValue(e.target.value)}
                    >
                    </input>

                    <Button
                        onClick={() => setOpen(true)}
                        className={`h-full ${props.bgColor}`}
                        padding='p-2'
                        rounded='rounded-l-none rounded-r-lg'
                        hoverColor={props.hoverColor}
                        activeColor={props.activeColor}
                    >
                        ▼
                    </Button>

                    <div className={`pt-2
                    ${open ? "" : "hidden"}
                    absolute max-h-64 z-60 my-1 rounded-lg overflow-scroll scrollbar-thin scrollbar-thumb-rounded-full dark:scrollbar-thumb-slate-500 scrollbar-thumb-slate-400 ${props.bgColor}`}>
                        {props.data.map((item, index) => {
                            let match = false;

                            if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
                                match = true;
                            }

                            item.search.forEach((search) => {
                                if (search.includes(searchValue.toLowerCase())) {
                                    match = true;
                                }
                            })

                            return (
                                <div key={index}>
                                    <Button
                                        onClick={() => select(item)}
                                        className={`w-full text-left ${match ? "" : "hidden"}`}
                                        hoverColor={props.hoverColor}
                                        activeColor={props.activeColor}
                                        padding='py-2 px-6'
                                        rounded='rounded-none'
                                    >
                                        {item.name}
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </OutsideAlerter>
        </div>
    );
}

Selector.propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    bgColor: PropTypes.string,
    hoverColor: PropTypes.string,
    activeColor: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
}

export default Selector;