import React from "react";
import Text from "../atoms/Text";
import Image from "../atoms/Image";
import CardsDisplay from "../organisms/CardsDisplay";

function Section({ content = [], className = "" }) {
  return (
    <div className={className}>
      {content.map((item, index) => {
        
        if (item.type === "text") {
          return (
            <div key={index} className="mb-4">
                {item.text.map(t => (
                    <Text key={t.id} variant={t.variant} className={t.className}>{t.content}</Text>
                ))}
            </div>
          );
        }

        if (item.type === "image") {
          return <Image key={index} src={item.src} alt={item.alt} className={item.className} />;
        }

        if (item.type === "cards") {
          return <CardsDisplay key={index} content={item.cards} />;
        }

        return null;
      })}
    </div>
  );
}

export default Section;