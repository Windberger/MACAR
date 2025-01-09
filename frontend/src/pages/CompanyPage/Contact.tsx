import { IOpeningTimes } from "../../interfaces/IOpeningTimes.ts";
import { BsInstagram } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";

function Contact() {
    const address = 'Stjena bb, 77224\nBosnia and Herzegovina';
    const phone = '+387 61 674285';
    const businessHours: IOpeningTimes[] = [
        { weekDay: 'Sunday', startTime: '08:00', endTime: '14:00' },
        { weekDay: 'Monday', startTime: '08:00', endTime: '17:00' },
        { weekDay: 'Tuesday', startTime: '08:00', endTime: '17:00' },
        { weekDay: 'Wednesday', startTime: '08:00', endTime: '17:00' },
        { weekDay: 'Thursday', startTime: '08:00', endTime: '17:00' },
        { weekDay: 'Friday', startTime: 'Closed', endTime: '' },
        { weekDay: 'Saturday', startTime: '08:00', endTime: '17:00' },
    ];

    return (
        <div id="contact" className="flex flex-col md:flex-row justify-center items-start md:items-center p-6 bg-gray-100 text-gray-800 space-y-4 md:space-y-0 md:space-x-6">
            {/* Left Section */}
            <div className="md:w-1/2 text-left px-4 max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-red-700">GET IN TOUCH</h2>
                <p className="text-lg font-medium mb-3">
                    Hey! We are looking forward to starting a project with you!
                </p>
                <p className="text-sm text-gray-600 mb-3">
                    Etiam sit amet convallis erat – class aptent taciti sociosqu ad litora torquent per conubia!
                    Maecenas gravida lacus. Lorem etiam sit amet convallis erat.
                </p>

                <div>
                    <h3 className="text-lg font-bold">CALL US</h3>
                    <p className="text-sm">{phone}</p>
                </div>

                <div className="flex space-x-4 mt-4">
                    {/* Instagram Icon */}
                    <a
                        href="https://www.instagram.com/macar.ba?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-700"
                    >
                        <BsInstagram size={24}/>
                    </a>

                    {/* Google Maps Icon */}
                    <a
                        href="https://maps.app.goo.gl/tq3WHoafEfVPmujB6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-700"
                    >
                        <SiGooglemaps size={24}/>
                    </a>
                </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 text-left px-4 max-w-md space-y-3">
                <div>
                    <h3 className="text-lg font-bold">LOCATION</h3>
                    <p className="text-sm whitespace-pre-line">{address}</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold">BUSINESS HOURS</h3>
                    <ul className="text-sm space-y-1">
                        {businessHours.map((hour, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{hour.weekDay}</span>
                                <span className="ml-2">{hour.startTime}{hour.endTime && `–${hour.endTime}`}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Contact;