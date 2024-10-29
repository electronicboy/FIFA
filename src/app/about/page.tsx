import { FC } from "react";
import { Card, Stack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

interface Person {
name: string;
description: string;
img: string
}

const About: FC = () => {
const people: Person[] = [
    { name: "Lewis Allen", description: "This is Lewis he is the best", img: "./LewisAvatar.webp" },
    { name: "Shane Freeder", description: "This is Shane he likes sharpening knifes", img: "./ShaneAvatar.webp" },
    { name: "Michelle Ratcliffe", description: "This is Michelle she is cursed", img: "./MichelleAvatar.png" }
];

return (
    <>
    <h1 >Find it Faster Week 11/12 Project</h1>
    <div className="people">
    <Stack gap="4" direction="row" wrap="wrap">
    {people.map((person) => (
        <Card.Root width="320px" key={person.name}>
        <Card.Body gap="2">
            <Avatar
            src={person.img}
            name={person.name}
            size="lg"
            shape="rounded"
            />
            <Card.Title mb="2">{person.name}</Card.Title>
            <Card.Description>{person.description}</Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
        </Card.Footer>
        </Card.Root>
        
    ))}
    </Stack>
    <div className= "info">
<h2>About This Project</h2>
<p>PROJECT INFO GOES HERE</p>
    </div>
 </div>
 </>
)}
export default About;