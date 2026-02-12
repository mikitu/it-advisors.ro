#!/bin/bash

# Database Migration Script
# Migrates data from local MySQL to remote MySQL

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Find .env file
ENV_FILE=""
if [ -f "../.env" ]; then
    ENV_FILE="../.env"
elif [ -f ".env" ]; then
    ENV_FILE=".env"
else
    echo -e "${RED}Error: .env file not found${NC}"
    exit 1
fi

# Function to get value from .env file
get_env() {
    local key=$1
    local value=$(grep "^${key}=" "$ENV_FILE" | cut -d '=' -f2- | sed 's/^"//' | sed 's/"$//')
    echo "$value"
}

# Local database config (from .env)
LOCAL_HOST=$(get_env "DATABASE_HOST")
LOCAL_HOST="${LOCAL_HOST:-127.0.0.1}"
LOCAL_PORT=$(get_env "DATABASE_PORT")
LOCAL_PORT="${LOCAL_PORT:-3306}"
LOCAL_DB=$(get_env "DATABASE_NAME")
LOCAL_DB="${LOCAL_DB:-itadvisors_cms}"
LOCAL_USER=$(get_env "DATABASE_USERNAME")
LOCAL_USER="${LOCAL_USER:-root}"
LOCAL_PASS=$(get_env "DATABASE_PASSWORD")

# Remote database config (TO_ prefix)
REMOTE_HOST=$(get_env "TO_DATABASE_HOST")
REMOTE_PORT=$(get_env "TO_DATABASE_PORT")
REMOTE_PORT="${REMOTE_PORT:-3306}"
REMOTE_DB=$(get_env "TO_DATABASE_NAME")
REMOTE_USER=$(get_env "TO_DATABASE_USERNAME")
REMOTE_PASS=$(get_env "TO_DATABASE_PASSWORD")

# Backup filename
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${TIMESTAMP}.sql"

echo -e "${YELLOW}=== Database Migration Script ===${NC}"
echo ""
echo "Source (Local):"
echo "  Host: $LOCAL_HOST:$LOCAL_PORT"
echo "  Database: $LOCAL_DB"
echo "  User: $LOCAL_USER"
echo ""
echo "Destination (Remote):"
echo "  Host: $REMOTE_HOST:$REMOTE_PORT"
echo "  Database: $REMOTE_DB"
echo "  User: $REMOTE_USER"
echo ""

# Confirm
read -p "Continue with migration? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Migration cancelled${NC}"
    exit 1
fi

# Step 1: Export from local
echo -e "${YELLOW}Step 1: Exporting from local database...${NC}"
if [ -z "$LOCAL_PASS" ]; then
    mysqldump -h "$LOCAL_HOST" -P "$LOCAL_PORT" -u "$LOCAL_USER" \
        --single-transaction --routines --triggers \
        "$LOCAL_DB" > "$BACKUP_FILE"
else
    mysqldump -h "$LOCAL_HOST" -P "$LOCAL_PORT" -u "$LOCAL_USER" -p"$LOCAL_PASS" \
        --single-transaction --routines --triggers \
        "$LOCAL_DB" > "$BACKUP_FILE"
fi
echo -e "${GREEN}✓ Exported to $BACKUP_FILE ($(du -h $BACKUP_FILE | cut -f1))${NC}"

# Step 2: Import to remote
echo -e "${YELLOW}Step 2: Importing to remote database...${NC}"
mysql -h "$REMOTE_HOST" -P "$REMOTE_PORT" -u "$REMOTE_USER" -p"$REMOTE_PASS" \
    "$REMOTE_DB" < "$BACKUP_FILE"
echo -e "${GREEN}✓ Imported to remote database${NC}"

# Step 3: Cleanup (optional)
read -p "Delete local backup file? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm "$BACKUP_FILE"
    echo -e "${GREEN}✓ Backup file deleted${NC}"
else
    echo -e "${YELLOW}Backup saved: $BACKUP_FILE${NC}"
fi

echo ""
echo -e "${GREEN}=== Migration Complete ===${NC}"

