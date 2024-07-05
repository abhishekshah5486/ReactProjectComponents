import { useEffect, useState } from "react";
import './Typing.css';

const Typing = ( {text, typingSpeed, deletingSpeed, duration = 1000} ) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect( () => {
        const handleTyping = () => {
            if (!isDeleting){
                if (displayedText.length < text[index].length){
                    setDisplayedText((prev) => prev + text[index].charAt(displayedText.length));
                } else{
                    setTimeout(() => {
                        setIsDeleting(true);
                    }, 1000);
                }
            }
            if (isDeleting){
                if (displayedText.length != 0){
                    setDisplayedText((prev) => prev.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % text.length);
                }
            }
        }
        const timeout = setTimeout( 
            handleTyping, 
            isDeleting ? deletingSpeed : typingSpeed 
        );
        return () => clearTimeout(timeout);
    }, [displayedText, index, isDeleting, typingSpeed, deletingSpeed])
    return (
        <div>
            {displayedText}
            <span className="cursor-blinking">|</span>
        </div>
    )
}
export default Typing;