const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Helpers
  const hash = (password) => bcrypt.hashSync(password, 10);

  console.log("Seeding started...");

  // USERS
  const users = [
    {
      id: "u1",
      name: "John Doe",
      phone: "01711111111",
      email: "john@example.com",
      password: hash("password123"),
      role: "user",
    },
    {
      id: "u2",
      name: "Sarah Rahman",
      phone: "01822222222",
      email: "sarah@example.com",
      password: hash("password123"),
      role: "admin",
    },
    {
      id: "u3",
      name: "Arif Hasan",
      phone: "01933333333",
      email: "arif@example.com",
      password: hash("password123"),
      role: "user",
    },
    {
      id: "u4",
      name: "Maya Islam",
      phone: "01644444444",
      email: "maya@example.com",
      password: hash("password123"),
      role: "user",
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }

  // SERVICES
  const services = [
    {
      id: "s1",
      name: "Elderly Companionship Visit",
      description:
        "Daily companionship visit including basic emotional support.",
      price: 1500,
      category: "COMPANIONSHIP",
      location: "CHITTAGONG",
      available: true,
    },
    {
      id: "s2",
      name: "Medical Checkup Assistance",
      description: "Assistance in hospital or clinic visits.",
      price: 2000,
      category: "MEDICAL",
      location: "DHAKA",
      available: true,
    },
    {
      id: "s3",
      name: "Home Cleaning Support",
      description: "Basic cleaning and organization for elderly clients.",
      price: 1200,
      category: "HOUSEHOLD",
      location: "CHITTAGONG",
      available: true,
    },
    {
      id: "s4",
      name: "Medication Reminder Service",
      description: "Scheduled reminders and monitoring of medication intake.",
      price: 800,
      category: "MEDICAL",
      location: "SYLHET",
      available: true,
    },
    {
      id: "s5",
      name: "Grocery Assistance",
      description: "Support with grocery shopping or delivery.",
      price: 1000,
      category: "ERRANDS",
      location: "CHITTAGONG",
      available: true,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }

  // BOOKINGS
  const bookings = [
    {
      id: "b1",
      userId: "u1",
      serviceId: "s1",
      bookingDate: "2026-04-10",
      bookingTime: "10:00 AM",
      duration: 2,
      status: "confirmed",
      notes: "Client prefers morning visits.",
    },
    {
      id: "b2",
      userId: "u3",
      serviceId: "s2",
      bookingDate: "2026-04-12",
      bookingTime: "3:30 PM",
      duration: 1,
      status: "pending",
    },
    {
      id: "b3",
      userId: "u4",
      serviceId: "s5",
      bookingDate: "2026-04-14",
      bookingTime: "9:00 AM",
      duration: 1,
      status: "completed",
      notes: "Delivered groceries successfully.",
    },
  ];

  for (const b of bookings) {
    await prisma.booking.upsert({
      where: { id: b.id },
      update: b,
      create: b,
    });
  }

  // REVIEWS
  const reviews = [
    {
      id: "r1",
      serviceId: "s1",
      userId: "u1",
      userName: "John Doe",
      rating: 5,
      comment: "Very compassionate and helpful.",
    },
    {
      id: "r2",
      serviceId: "s2",
      userId: "u3",
      userName: "Arif Hasan",
      rating: 4,
      comment: "Smooth experience at the clinic.",
    },
    {
      id: "r3",
      serviceId: "s5",
      rating: 5,
      userName: "Anonymous",
      comment: "On time and reliable.",
    },
  ];

  for (const r of reviews) {
    await prisma.review.upsert({
      where: { id: r.id },
      update: r,
      create: r,
    });
  }

  // BLOG POSTS
  const blogPosts = [
    {
      id: "bp1",
      title: "How Companionship Improves Senior Health",
      content:
        "Regular companionship reduces loneliness and boosts mental health.",
      author: "Admin",
    },
    {
      id: "bp2",
      title: "Managing Medication for Elderly Loved Ones",
      content: "A proper medication schedule improves recovery and safety.",
      author: "Sarah Rahman",
    },
    {
      id: "bp3",
      title: "Why Regular Checkups Matter",
      content:
        "Early detection of issues saves lives. Here is what you should know.",
      author: "Medical Dept",
    },
  ];

  for (const bp of blogPosts) {
    await prisma.blogPost.upsert({
      where: { id: bp.id },
      update: bp,
      create: bp,
    });
  }

  // FAQ
  const faqs = [
    {
      id: "f1",
      question: "How do I book a service?",
      answer: "You can book through the website or by calling our hotline.",
    },
    {
      id: "f2",
      question: "Are your caregivers trained?",
      answer:
        "All caregivers undergo background checks and skill verification.",
    },
    {
      id: "f3",
      question: "Do you provide emergency services?",
      answer: "Emergency services are offered to registered members.",
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.upsert({
      where: { id: f.id },
      update: f,
      create: f,
    });
  }

  // FEEDBACK
  const feedbacks = [
    {
      id: "fb1",
      name: "Visitor Ahmed",
      email: "visitor@example.com",
      subject: "Site looks great",
      message: "Navigation is smooth and easy.",
    },
    {
      id: "fb2",
      userId: "u1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Companionship service feedback",
      message: "The caregiver was punctual and kind.",
    },
  ];

  for (const fb of feedbacks) {
    await prisma.feedback.upsert({
      where: { id: fb.id },
      update: fb,
      create: fb,
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
