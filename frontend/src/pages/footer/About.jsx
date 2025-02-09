// about.jsx


const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">About Us</h1>
      
      <p className="text-lg  text-gray-900  leading-relaxed mb-4">
        Welcome to <strong>Prime Next</strong>, your one-stop destination for all your shopping needs! We’re passionate about bringing you the best products at unbeatable prices while delivering an exceptional shopping experience.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Who We Are</h2>
      <p className="text-lg  text-gray-900  leading-relaxed mb-4">
        At <strong>Prime Next</strong>, we believe shopping should be easy, enjoyable, and accessible. Founded with the vision of offering high-quality products across diverse categories, we are dedicated to creating a platform that caters to every customer’s needs.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Why Choose Us?</h2>
      <ul className="list-disc list-inside  text-gray-900  text-lg leading-relaxed mb-4">
        <li><strong>Diverse Range of Products:</strong> From fashion and electronics to home essentials and more, we’ve curated a wide variety to suit your lifestyle.</li>
        <li><strong>Unbeatable Prices:</strong> We work directly with trusted suppliers to ensure competitive prices without compromising on quality.</li>
        <li><strong>Customer-Centric Approach:</strong> Your satisfaction is our priority. We are committed to providing top-notch service and ensuring a seamless shopping journey.</li>
        <li><strong>Secure Shopping:</strong> With secure payment options and a user-friendly interface, you can shop with confidence.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Our Mission</h2>
      <p className="text-lg  text-gray-900  leading-relaxed mb-4">
        Our mission is to redefine online shopping by offering products and services that enrich your life. We aim to build a community of happy customers who trust us for their shopping needs.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Get in Touch</h2>
      <p className="text-lg  text-gray-900  leading-relaxed mb-2">
        Have questions or feedback? We’d love to hear from you!
      </p>
      <ul className="text-lg leading-relaxed">
        <li><strong className=' text-gray-900 '>Email:</strong> <a href="mailto:Prime Next@.com" className="text-blue-500 underline">support@Prime Next.com</a></li>
        <li className=' text-gray-900 '><strong>Phone:</strong> +91 9559559559</li>
        <li className=' text-gray-900 '><strong >Social Media:</strong> Follow us on 
          <a href="#" className="text-blue-500 underline">Facebook</a>, 
          <a href="#" className="text-blue-500 underline">Instagram</a>, and 
          <a href="#" className="text-blue-500 underline">Twitter</a>.
        </li>
      </ul>
    </div>
  </div>

  );
}

export default About;
