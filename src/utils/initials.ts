
export const initialOnboardingForm = {
  data: {
    orders: "",
    aov: "",
    cvr: "",
    cogs: "",
    cac: "",
  },
  display: {
    orders: true,
    aov: false,
    cvr: false,
    cogs: false,
    cac: false,
  },
  focus: "orders",
};

export const initialInfoForm = {
  data: {
    name: "",
    email: "",
    company: "",
  },
  display: {
    name: true,
    email: false,
    company: false,
  },
  focus: "name",
};

// const initialPriceTestForm = {
//   data: {
//     priceChange: "",
//     cvrChange: "",
//   },
//   display: {
//     priceChange: true,
//     cvrChange: false,
//   },
//   focus: "priceChange",
// };