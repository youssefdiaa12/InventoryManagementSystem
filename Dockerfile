# Base image
FROM php:8.2-apache

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    zip unzip git curl libpng-dev libonig-dev libxml2-dev nodejs npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Enable Apache mod_rewrite (required for Laravel routing)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy composer and app
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY . .
COPY .env.example /var/www/html/.env.example

# Ensure .env exists
RUN if [ ! -f ".env" ]; then cp .env.example .env; fi

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install frontend dependencies + build assets
RUN npm install && npm run build

# Copy wait-for-it.sh script into the image
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Set permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose Apache port
EXPOSE 8080

# Set Apache document root to Laravel public folder
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/000-default.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Start Apache (default) - migrations will run via docker-compose command override
CMD ["apache2-foreground"]
