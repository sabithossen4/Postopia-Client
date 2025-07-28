import { FaBullhorn } from "react-icons/fa";

const Announcements = () => {
  const announcement = {
    title: "Scheduled Maintenance Notice",
    description:
      "Our forum platform will undergo scheduled maintenance on July 29th, 2025, from 2:00 AM to 4:00 AM (GMT+6). During this time, the website may be temporarily unavailable. We appreciate your patience.",
    author: "Sabit Hossen",
    date: "7/27/2025, 6:06:30 PM",
    photoURL: "https://i.ibb.co/jZb51qKt/premium-photo-1685086785054-d047cdc0e525-1.jpg",
  };

  return (
    <section className="p-4 md:p-8 bg-white rounded-xl shadow-md border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <FaBullhorn className="text-xl text-purple-600" />
        <h2 className="text-xl font-semibold text-purple-700">Announcements</h2>
      </div>
      <hr className="mb-4" />
      <div className="bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-100 flex flex-col md:flex-row items-start gap-4">
        <img
          src={announcement.photoURL}
          alt="Author"
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-purple-700">{announcement.title}</h3>
          <p className="text-gray-700 mt-1">{announcement.description}</p>
          <p className="mt-2 text-sm text-purple-600">
            <span className="font-semibold">By:</span> {announcement.author}
          </p>
        </div>
        <p className="text-sm italic text-gray-500 self-end md:self-start md:ml-auto">
          Published: {announcement.date}
        </p>
      </div>
    </section>
  );
};

export default Announcements;
