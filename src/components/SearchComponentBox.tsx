"use client";
import {ChangeEvent, useState} from "react";

export default function SearchComponentBox({locations, categories}: {
    locations: Array<{ id: number, location_name: string, country: string }>,
    categories: Array<{ id: number, name: string }>
}) {
    const [selectedLocations, setselectedLocations] = useState<Array<number>>([]);
    const [selectedCategories, setselectedCategories] = useState<Array<number>>([]);

    function updateSelectedLocations(e: ChangeEvent<HTMLInputElement>) {
        const targetNum = Number(e.target.value)
        if (targetNum == null || isNaN(targetNum)) {
            return;
        }


        const newVal = e.target.checked as boolean
        if (newVal) {
            setselectedLocations(prev => {
                const ret = [...prev];
                ret.push(targetNum)
                return ret;
            })
        } else {
            setselectedLocations(prev => {
                const ret: Array<number> = [];
                prev.forEach(val => { if (val != targetNum) { ret.push(val); } });
                return ret;
            })
        }
    }

    function updateSelectedCategories(e: ChangeEvent<HTMLInputElement>) {
        const targetNum = Number(e.target.value)
        if (targetNum == null || isNaN(targetNum)) {
            return;
        }


        const newVal = e.target.checked as boolean
        if (newVal) {
            setselectedCategories(prev => {
                const ret = [...prev];
                ret.push(targetNum)
                return ret;
            })
        } else {
            setselectedCategories(prev => {
                const ret: Array<number> = [];
                prev.forEach(val => { if (val != targetNum) { ret.push(val); } });
                return ret;
            })
        }
    }

    return (
        <>
            <form action={"#"}>
                <div>Locations</div>
                {locations.map(location => (
                    <div key={location.id}>
                        <input type={"checkbox"} value={location.id} onChange={updateSelectedLocations}
                               checked={selectedLocations.includes(location.id)}></input><label>{location.location_name}, {location.country}</label>
                    </div>
                ))}
                <div>Categories</div>
                {categories.map(category => (
                    <div key={category.id}>
                        <input type={"checkbox"} value={category.id} onChange={updateSelectedCategories}
                               checked={selectedCategories.includes(category.id)}></input><label>{category.name}</label>
                    </div>
                ))}

            </form>
        </>);
}
