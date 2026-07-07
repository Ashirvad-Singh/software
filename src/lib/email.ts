import emailjs from '@emailjs/browser';

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

emailjs.init(publicKey);

export const sendJobApplicationEmail = async (applicantName: string, applicantEmail: string, position: string) => {
  try {
    const templateParams = {
      to_name: applicantName,
      to_email: applicantEmail,
      position: position,
      message: `Thank you for applying for the ${position} role at Adat Soft Solutions. We have received your application and our team is currently reviewing it. We will get back to you shortly.`
    };
    // Replace with actual Service ID and Template ID
    await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );
    return true;
  } catch (error) {
    console.error("Failed to send email", error);
    return false;
  }
};

export const sendJobStatusUpdateEmail = async (applicantName: string, applicantEmail: string, position: string, status: string) => {
  let message = "";
  
  if (status === "Interview Scheduled") {
    message = `Great news! We would like to invite you for an interview for the ${position} role. Our team will contact you shortly with available time slots.`;
  } else if (status === "Selected") {
    message = `Congratulations! We are thrilled to inform you that you have been selected for the ${position} role at Adat Soft Solutions. We will share the offer details soon.`;
  } else if (status === "Rejected") {
    message = `Thank you for taking the time to apply for the ${position} role. After careful consideration, we have decided to move forward with other candidates at this time. We will keep your resume on file for future opportunities.`;
  } else {
    message = `Your application for the ${position} role has been updated to: ${status}.`;
  }

  try {
    const templateParams = {
      to_name: applicantName,
      to_email: applicantEmail,
      position: position,
      message: message
    };
    // Replace with actual Service ID and Template ID
    await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );
    return true;
  } catch (error) {
    console.error("Failed to send email", error);
    return false;
  }
};
