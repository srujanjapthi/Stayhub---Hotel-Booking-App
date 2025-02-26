const Footer = () => {
  return (
    <div className="bg-blue-800 py-6 px-5">
      <div className="container mx-auto flex justify-between items-center flex-col gap-2 md:flex-row">
        <span className="text-3xl text-white font-bold tracking-tight">
          Stay Hub
        </span>
        <span className="text-white font-semibold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
