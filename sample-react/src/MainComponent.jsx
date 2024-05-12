"use client";
import React from "react";

function MainComponent({ letters, textOne, textTwo, onDelete, onInsert }) {
    return (
        <div className="grid grid-cols-5 gap-4 p-4">
            <select className="w-full border rounded p-2 font-roboto">
                {letters.map((letter) => (
                    <option key={letter} value={letter}>
                        {letter}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={textOne}
                readOnly
                className="w-full border rounded p-2 bg-gray-100 font-roboto"
            />
            <input
                type="text"
                value={textTwo}
                readOnly
                className="w-full border rounded p-2 bg-gray-100 font-roboto"
            />
            <button
                onClick={onDelete}
                className="w-full p-2 flex justify-center items-center text-white bg-red-500 rounded font-roboto"
                aria-label="Delete"
            >
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button
                onClick={onInsert}
                className="w-full p-2 flex justify-center items-center text-white bg-blue-500 rounded font-roboto"
                aria-label="Insert"
            >
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
    );
}

function StoryComponent() {
    const letters = ["A", "B", "C"];
    const textOne = "Read-only Text 1";
    const textTwo = "Read-only Text 2";
    const handleDelete = () => {
        console.log("delete clicked");
    };
    const handleInsert = () => {
        console.log("insert clicked");
    };

    return (
        <div>
            <MainComponent
                letters={letters}
                textOne={textOne}
                textTwo={textTwo}
                onDelete={handleDelete}
                onInsert={handleInsert}
            />
        </div>
    );
}

export default StoryComponent;
