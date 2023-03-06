import React from "react";
import Dropdown from "../Dropdown";
import Input from "./Input";

export default function SelectionInput({ options, onSelected }) {
    const [selected, setSelected] = React.useState("");

    const select = (e) => {
        setSelected(options[e.target.value].label);
        onSelected(options[e.target.value].value);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle>
                <div className="felx items-center justify-between border border-gray-300 rounded-md px-4">
                    <Input
                        type="text"
                        value={selected}
                        readOnly={true}
                        className="border-none px-0"
                    />
                    <i className="bi bi-chevron-down"></i>
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-full">
                <div className=" w-full bg-white rounded-md z-20 overflow-hidden">
                    {options.map((option, i) => (
                        <label
                            key={i}
                            htmlFor={option.value}
                            className="flex py-1.5 px-3 hover:bg-slate-100 rounded-md"
                        >
                            <input
                                type="radio"
                                name="selection"
                                id={option.value}
                                value={i}
                                onChange={select}
                                className="hidden"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}
<div className="flex flex-col relative"></div>;
