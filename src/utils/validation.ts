export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^۰۹\d{9}$/
  return phoneRegex.test(phone)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength
}

export const validateNumber = (value: string): boolean => {
  return /^\d+$/.test(value.replace(/[^\d]/g, ''))
}

export const validateUserForm = (data: {
  name: string
  email: string
  phone: string
}) => {
  const errors: Record<string, string> = {}
  
  if (!validateRequired(data.name)) {
    errors.name = 'نام کاربر الزامی است'
  } else if (!validateMinLength(data.name, 2)) {
    errors.name = 'نام کاربر باید حداقل ۲ کاراکتر باشد'
  }
  
  if (!validateRequired(data.email)) {
    errors.email = 'ایمیل الزامی است'
  } else if (!validateEmail(data.email)) {
    errors.email = 'ایمیل معتبر نیست'
  }
  
  if (!validateRequired(data.phone)) {
    errors.phone = 'شماره تلفن الزامی است'
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'شماره تلفن معتبر نیست'
  }
  
  return errors
}

export const validateOrderForm = (data: {
  customer: string
  email: string
  products: string
  amount: string
  shippingAddress: string
}) => {
  const errors: Record<string, string> = {}
  
  if (!validateRequired(data.customer)) {
    errors.customer = 'نام مشتری الزامی است'
  }
  
  if (!validateRequired(data.email)) {
    errors.email = 'ایمیل الزامی است'
  } else if (!validateEmail(data.email)) {
    errors.email = 'ایمیل معتبر نیست'
  }
  
  if (!validateRequired(data.products)) {
    errors.products = 'محصولات الزامی است'
  }
  
  if (!validateRequired(data.amount)) {
    errors.amount = 'مبلغ الزامی است'
  } else if (!validateNumber(data.amount)) {
    errors.amount = 'مبلغ معتبر نیست'
  }
  
  if (!validateRequired(data.shippingAddress)) {
    errors.shippingAddress = 'آدرس ارسال الزامی است'
  }
  
  return errors
}

export const validateProductForm = (data: {
  name: string
  category: string
  price: string
  stock: string
  sku: string
}) => {
  const errors: Record<string, string> = {}
  
  if (!validateRequired(data.name)) {
    errors.name = 'نام محصول الزامی است'
  }
  
  if (!validateRequired(data.category)) {
    errors.category = 'دسته‌بندی الزامی است'
  }
  
  if (!validateRequired(data.price)) {
    errors.price = 'قیمت الزامی است'
  } else if (!validateNumber(data.price)) {
    errors.price = 'قیمت معتبر نیست'
  }
  
  if (!validateRequired(data.stock)) {
    errors.stock = 'موجودی الزامی است'
  } else if (!validateNumber(data.stock)) {
    errors.stock = 'موجودی معتبر نیست'
  }
  
  if (!validateRequired(data.sku)) {
    errors.sku = 'کد محصول الزامی است'
  }
  
  return errors
}
