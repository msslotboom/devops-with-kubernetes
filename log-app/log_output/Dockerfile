FROM rust:1.80-slim-bullseye AS builder

WORKDIR /usr/src/myapp
COPY . .

RUN cargo build --release


FROM debian:bullseye-slim
COPY --from=builder /usr/src/myapp/target/release/log_output /usr/local/bin/myapp
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8080
ENV ROCKET_LOG_LEVEL=debug
CMD ["myapp"]
