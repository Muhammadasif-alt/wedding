"use client";

// Envelope scene — asli envelope photo, seal pe tap karte hi seedha invitation khul jata hai

import Image from "next/image";

type Props = {
  opened: boolean;
  onOpen: () => void;
};

export default function Envelope({ opened, onOpen }: Props) {
  return (
    <div id="envScene" className={opened ? "opened" : ""} aria-label="Sealed wedding invitation envelope">
      {/* falling petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="petal" />
      ))}

      {/* envelope ki asli photo — file: public/envelope.png (badalni ho tou wahin replace kar do) */}
      <div className="env-photo">
        <Image
          src="/envelope.png"
          alt="Sealed pink wedding envelope with a gold wax seal"
          fill
          priority
          sizes="(max-width: 430px) 100vw, 430px"
        />
      </div>

      {/* invisible tap target — photo waale gold seal ke exactly upar baithta hai */}
      <button className="seal" onClick={onOpen} aria-label="Open the invitation" />

      {/* saaf dikhne wala button — seal ke neeche, "YOU ARE INVITED" ke upar */}
      <button className="open-btn" onClick={onOpen}>
        <span>Press to open</span>
      </button>
    </div>
  );
}
