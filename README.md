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
![image](https://user-images.githubusercontent.com/79765050/164933179-04fc7b3b-8a14-4cec-89f0-44d9044652e0.png)

![image](https://user-images.githubusercontent.com/79765050/164916583-7a356373-9db8-4cd5-a517-574c465e8edc.png)
***Randomly generated hash if not sent in the request*

---

### Application Flow
![Curtin URL (2)](https://user-images.githubusercontent.com/79765050/164927123-08553aa8-8764-4c43-bb16-921aa9a5f90f.png)
