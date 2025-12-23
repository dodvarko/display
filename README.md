# Display

Docker compose configuration

Plants directory should contain plant jpg images named after the entities.
```
    display:
      image: ghcr.io/dodvarko/display:<tag>
      restart: always
      container_name: display
      network_mode: host
      volumes:
        - ./data/plants:/mounted/plants
      environment:
       - DISPLAY_APP_HA_URL=<url>
       - DISPLAY_APP_HA_TOKEN=<token>
       - DISPLAY_APP_ENTITY_WHITELIST=<comma,separated,entities>
       - DISPLAY_APP_ROTATION_SECONDS=<screen-rotation-interval>
```       




