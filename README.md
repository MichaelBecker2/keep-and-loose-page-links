# Kepp and Loose - Page links
This is a small tool to generate a html file with all the links to pages we  
should keep for a given country/ domain.

## Usage
```bash
# Go into your working directory
cd into/your/working-directory

# Clone the repo
git clone git@github.com:MichaelBecker2/keep-and-loose-page-links.git

# Go into the tool directory
cd keep-and-loose-page-links

# Install all dependencies (only necessary on the first run)
npm install

# Run the script
npm start -- --file  <file-path> --domain <domain>
# For example
npm start -- --file ~/Downloads/keep_final_oetker.nl_migration.csv --domain oetker.nl
```

After the script has finished Chrome or your default browser should open with a very simple page  
which shows all the categories (we use the parent path) and links to required pages of a country.

## Issues
Please report any issue to michael.becker@oetkerdigital.com
