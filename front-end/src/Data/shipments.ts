export type Shipment = {
  itemId: string;
  address: string;
  loadingCity: string;
  addressDetails: string;
};

export const shipments: Shipment[] = [
  {
    itemId: "6",
    address: "משמר השבעה 31",
    loadingCity: "תל אביב",
    addressDetails:
      "היי!\nאני אשמח לעזרתכם להוביל אבל הפריט הזה לבית שלי בנתניה\n\nאנחנו חייבים למצוא פתרון עד יום שבת הקרוב... תודה רבה!",
  },
];
