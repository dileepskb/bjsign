type Testimonial = {
  review: string;
  authorImg: string;
  authorName: string;
  authorRole: string;
 
};

const testimonialsData: Testimonial[] = [
  {
    review: `"BJ Sign World helped us design unique signage that truly stands out. Their creative team brought our vision to life, and we couldn’t be happier with the result. The quality reflects their commitment to excellence. I highly recommend them for anyone needing quality printing services!"`,
    authorName: "Isabella",
    authorImg: "/images/users/user-01.jpg",
    authorRole: "Serial Entrepreneur",
  },
  {
    review: `"I was amazed by the speed at which BJ Sign World completed our printing project. They understood the urgency and delivered high-quality materials ahead of schedule. Their ability to meet tight deadlines without sacrificing quality is impressive. I’ll be using their services again for future events!`,
    authorName: "Zeo",
    authorImg: "/images/users/user-02.jpg",
    authorRole: "Backend Developer",
  },
  {
    review: `LI keep coming back to BJ Sign World for all our printing needs. Their consistent quality, exceptional service, and reliability keep us loyal. I can’t recommend them enough! Whether for banners, brochures, or signage, they always deliver outstanding results that impress our clients!"`,
    authorName: "Jaxon",
    authorImg: "/images/users/user-03.jpg",
    authorRole: "Serial Entrepreneur",
  },
  // {
  //   review: `Lorem ipsum dolor sit amet, adipiscing elit. Donec
  //   malesuada justo vitaeaugue suscipit beautiful vehicula`,
  //   authorName: "Thomas Frank",
  //   authorImg: "/images/users/user-01.jpg",
  //   authorRole: "Entrepreneur",
  // },
  // {
  //   review: `Lorem ipsum dolor sit amet, adipiscing elit. Donec
  //   malesuada justo vitaeaugue suscipit beautiful vehicula`,
  //   authorName: "Dave Smith",
  //   authorImg: "/images/users/user-02.jpg",
  //   authorRole: "Serial Entrepreneur",
  // },
  // {
  //   review: `Lorem ipsum dolor sit amet, adipiscing elit. Donec
  //   malesuada justo vitaeaugue suscipit beautiful vehicula`,
  //   authorName: "Davis Dorwart",
  //   authorImg: "/images/users/user-03.jpg",
  //   authorRole: "Serial Entrepreneur",
  // },
];

export default testimonialsData;
