

function ContactUs() {
  return (
    <div> <div className="container mx-auto px-4 py-8">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Contact Us</h1>

      <p className="text-lg  text-gray-900 leading-relaxed mb-4">
        Have questions or need assistance? We’re here to help! Reach out to us through any of the channels below, and our team will get back to you as soon as possible.
      </p>

      <ul className="text-lg leading-relaxed">
        <li className=" text-gray-900"><strong>Email:</strong> <a href="mailto:support@yourwebsitename.com" className="text-blue-500 underline">support@Prime Next.com</a></li>
        <li className=" text-gray-900"><strong>Phone:</strong>+91 9559559559 </li>
        <li className=" text-gray-900"><strong>Address:</strong> Near Busstand,Hyderabad</li>
        <li className=" text-gray-900"><strong>Social Media:</strong> Follow us on 
          <a href="#" className="text-blue-500 underline">Facebook</a>, 
          <a href="#" className="text-blue-500 underline">Instagram</a>, and 
          <a href="#" className="text-blue-500 underline">Twitter</a>.
        </li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default ContactUs