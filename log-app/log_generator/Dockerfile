FROM rust:1.80-slim-bullseye AS builder

WORKDIR /usr/src/myapp
COPY . .

RUN cargo build --release


FROM debian:bullseye-slim
COPY --from=builder /usr/src/myapp/target/release/log-generator /usr/local/bin/myapp
CMD ["myapp"]
