type Props = {
  src: string;
  size: string;
  className: string;
  onClick?: () => void;
};

const SVGIcon = ({ src, size, className, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        maskImage: `url(${src})`,
        maskSize: size,

        backgroundPosition: "center",
        backgroundSize: "cover",

        width: size,
        height: size,
      }}
    />
  );
};

export default SVGIcon;
