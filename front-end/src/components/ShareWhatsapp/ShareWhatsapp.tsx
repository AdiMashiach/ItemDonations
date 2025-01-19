import { WhatsApp } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Namespaces } from "../../i18n/i18n.constants";
import { Item } from "../../types";
import "./ShareWhatsapp.scss";

type ShareWhatsAppProps = {
  intro: string;
  item: Item;
  itemPublisherPhoneNumber: string;
};

const ShareWhatsApp = ({ intro, item, itemPublisherPhoneNumber }: ShareWhatsAppProps) => {
  const translations = {
    tTitle: useTranslation(Namespaces.title).t,
    tAction: useTranslation(Namespaces.action).t,
    tPlaceholder: useTranslation(Namespaces.placeholder).t,
  };

  console.log(itemPublisherPhoneNumber);

  const [whatsAppText, setWhatsAppText] = useState("");

  const onWhatsAppNumberChange = (whatsAppText: string) => {
    setWhatsAppText(whatsAppText);
  };

  const onSendClick = () => {
    const phoneNumberToText = itemPublisherPhoneNumber
    const textToSend = `${intro}: ${item.name}\n${whatsAppText}`;
    const encodedText = encodeURIComponent(textToSend);
    const whatsappLink = `https://wa.me/${phoneNumberToText.substring(1)}?text=${encodedText}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <Box className="card">
      <Box className="card__title">
        <WhatsApp className="card__title--icon" />
        <Typography className="card__title--text">
          {translations.tTitle("sendAMessage")}
        </Typography>
      </Box>
      <Box className="card__content">
        <TextField
          placeholder={translations.tPlaceholder("isItAvailable")}
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true,
            className: "card__content--text",
          }}
          value={whatsAppText}
          onChange={(e) => onWhatsAppNumberChange(e.target.value)}
          dir="rtl"
        />
        <Button
          variant="contained"
          className="card__content--button"
          onClick={onSendClick}
        >
          {translations.tAction("send")}
        </Button>
      </Box>
    </Box>
  );
};

export default ShareWhatsApp;
