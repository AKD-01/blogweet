import React, { useState } from "react";

const sortTypes = [
  { title: "By Date", tag: "date" },
  { title: "Random", tag: "random" },
];

export default function SortDropDown({ setSortType }) {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const handleSortClick = (tag) => {
    setSortType(tag);
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown-container"
        onClick={() => setIsDropDownOpen((prev) => !prev)}
      >
        <p className="dropdown-para">Select Filter Method</p>{" "}
        <img src="/down.png" className="dropdown-img"></img>
      </div>

      {isDropdownOpen && (
        <div className="checkbox-container">
          {sortTypes.map((type) => (
            <div
              className={type.tag}
              onClick={() => handleSortClick(type.tag)}
              key={type.tag}
            >
              <div className="checkboxes-bar">
                <p>{type.title}</p>
                {type.tag === "date" ? <span>{`(default)`}</span> : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
