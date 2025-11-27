import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";

function CardsDisplay({ content = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {content.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          {item.card.map((element, idx) => {
            if (element.type === "image") {
              return <Image key={idx} src={element.src} alt={element.alt} className={element.className} />;
            }
            if (element.type === "text") {
               return (
                 <div key={idx}>
                   {element.text.map(t => (
                     <Text key={t.id} variant={t.variant} className={t.className}>{t.content}</Text>
                   ))}
                 </div>
               );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}

export default CardsDisplay;