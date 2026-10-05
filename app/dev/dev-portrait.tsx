import Image from "next/image";

export function DevPortrait() {
  const width = 400;
  const height = 300;
  const scale = width / 600;

  // Overlay % were tuned against a 400px-tall box while the GIF itself is 300px.
  // Convert vertical % from that old reference height.
  const refHeight = 400;
  const photoTop = `${(14.2 * refHeight) / height}%`;
  const foxTop = `${(43.2 * refHeight) / height}%`;

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src="/dev/profile-loop.gif"
        alt="Animated geometric portrait background"
        width={width}
        height={height}
        unoptimized
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute overflow-hidden bg-white hover:grayscale"
        style={{
          top: photoTop,
          left: "3.2%",
          width: `${280 * scale}px`,
          height: `${210 * scale}px`,
        }}
      >
        <Image
          src="/dev/michael-sipes.png"
          alt="Michael Sipes"
          width={336 * scale}
          height={247 * scale}
          unoptimized
          priority
          className="h-full w-full scale-110 object-cover"
        />
      </div>

      <Image
        src="/favicon.ico"
        alt="Fox"
        width={36 * scale}
        height={36 * scale}
        className="absolute object-cover hover:grayscale"
        style={{ top: foxTop, left: "61.8%" }}
      />
    </div>
  );
}
