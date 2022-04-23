# 📎 CURTIN - URL Shortener 
Application to shorten url and generate QR Codes

## Documentation
### Shorten URL
- Request route: ```https://curtin.herokuapp.com/shorten/```
- Request method: ```POST```
- Request parameters format: ```Query String```
- Parameters: ```url``` / ```hash*```

**Optional parameter*
- Response format: ```JSON``` 
```javascript
{
  "shortened_url", 
  "qr_code_url"
}
```

---

### Requests Examples
![164916656-7dece136-cb79-4a62-ad88-32700e583061](https://user-images.githubusercontent.com/79765050/164931867-41656098-9d4f-4f9f-864b-d212f3ab4389.png)

![image](https://user-images.githubusercontent.com/79765050/164916583-7a356373-9db8-4cd5-a517-574c465e8edc.png)
***Randomly generated hash if not sent in the request*

---

### Application Flow
![Curtin URL (2)](https://user-images.githubusercontent.com/79765050/164927123-08553aa8-8764-4c43-bb16-921aa9a5f90f.png)
