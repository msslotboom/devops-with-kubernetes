FROM rust:1.80-slim-bullseye AS builder

WORKDIR /usr/src/myapp
COPY . .
RUN apt-get update && \
    apt-get install -y openssl libssl-dev pkg-config && \
    rm -rf /var/lib/apt/lists/*
RUN cargo build --release


FROM debian:bullseye-slim
COPY --from=builder /usr/src/myapp/target/release/log_output /usr/local/bin/myapp
RUN apt-get update && \
    apt-get install -y openssl libssl-dev pkg-config && \
    rm -rf /var/lib/apt/lists/*
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8080
ENV ROCKET_LOG_LEVEL=debug
CMD ["myapp"]
