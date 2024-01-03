import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useOutsideAlerter(ref, action) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                action();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, action]);
}

function OutsideAlerter(props) {
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, props.action);

    return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideAlerter.propTypes = {
    children: PropTypes.element,
    action: PropTypes.func,
};

export default OutsideAlerter;
