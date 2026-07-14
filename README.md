# The Backend Engineer's Field Library

A landing page tying together thirteen battle-tested playbooks — **13 playbooks, 483 topics, one connected mental model** for the whole modern stack.

🔗 **Live:** https://baluraut.github.io/field-library/

## The thirteen playbooks

| Playbook | Topics | Covers |
| --- | --- | --- |
| [PostgreSQL Pro Playbook](https://baluraut.github.io/postgres-pro-playbook/) | 46 | UPSERT, window functions, JSONB, indexing, tuning |
| [Ruby &amp; Rails Pro Playbook](https://baluraut.github.io/ruby-rails-pro-playbook/) | 104 | 52 Ruby + 52 Rails — language to production |
| [EKS · ECR · CircleCI Playbook](https://baluraut.github.io/eks-ecr-circleci-playbook/) | 60 | Containers → Kubernetes → CI/CD deploys |
| [Linux Playbook](https://baluraut.github.io/linux-playbook/) | 34 | Files, processes, the shell toolbelt, systemd, cgroups |
| [Networking Playbook](https://baluraut.github.io/networking-playbook/) | 26 | IP, TCP/UDP, DNS, TLS, HTTP, firewalls, debugging |
| [MCP Server Playbook](https://baluraut.github.io/mcp-server-playbook/) | 25 | Building MCP servers — primitives, transports, OAuth, trust |
| [Agentic AI Playbook](https://baluraut.github.io/agentic-ai-playbook/) | 30 | LLM agents, the agent loop, RAG, evals &amp; safety |
| [Distributed Systems Playbook](https://baluraut.github.io/distributed-systems-playbook/) | 22 | CAP, consensus, replication, sharding, caching, resilience |
| [Event-Driven Architecture Playbook](https://baluraut.github.io/event-driven-playbook/) | 16 | Queues, streams, Kafka, sagas, outbox, CQRS, DLQs |
| [Node.js &amp; TypeScript Playbook](https://baluraut.github.io/nodejs-typescript-playbook/) | 30 | Event loop, async, streams, the TS type system, shipping |
| [React &amp; TypeScript Playbook](https://baluraut.github.io/react-typescript-playbook/) | 30 | JSX, hooks, rendering, state, typing React, a11y |
| [Application Security Playbook](https://baluraut.github.io/security-playbook/) | 30 | XSS, CSRF, SQLi, access control, SSRF, secrets, TLS, incident response |
| [System Design &amp; Technical Leadership Playbook](https://baluraut.github.io/system-design-leadership-playbook/) | 30 | Scaling, SLOs, tradeoffs, code review, mentoring, RFCs |

## Why one library

These aren't thirteen separate subjects — they're one stack seen from thirteen heights, and the playbooks cross-reference each other on purpose: a Rails N+1 becomes a Postgres query plan; a container is a Linux process with a cgroup, so a Kubernetes `OOMKilled` and a bare-metal OOM are the same event; jsonb reappears as `store_accessor`; a CIDR block is a CIDR block whether it's a subnet or a VPC; and a prompt-injection defense is the same least-privilege and input-validation instinct the Application Security playbook teaches as its own layer.

## View locally

Open `index.html` in a browser. Its cards link to the other sites once they're published.

## Publish (GitHub Pages)

Push to a repo named `field-library` (or use it as your root `baluraut.github.io` user page), then **Settings → Pages → Source: `main` / root**.

Each linked playbook must be published under the matching repo name for the cards to resolve.
