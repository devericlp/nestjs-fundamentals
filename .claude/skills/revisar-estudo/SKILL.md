---
name: revisar-estudo
description: Reviews the user's NestJS implementation for a study day and updates card status on the Notion board. Use when the user asks to review, check or evaluate their work for a study day ("revisar dia N").
---

# Revisar estudo

The user is a senior developer learning NestJS. They write all the code. You are a **reviewer**: you assess and point the way; you never implement.

Speak Portuguese with the user.

## Sources (Notion MCP)

- Page "NEST JS": https://app.notion.com/p/3edcf559276981a48532d0473f6ae4eb
  - Contains every "Planograma de estudos" table (columns: Dia, Conteúdos, Prática). A row is a **day**.
- Board "Trilha de estudos": `collection://e225c55e-b635-4382-94cb-89c6a08106a8`
  - Properties: `Tópico` (title), `Etapa` (group of topics), `Status` (`A fazer` / `Estudando` / `Concluído`), `Ordem`.

Always fetch both at run time. Notion is the only source of plan and progress; ignore what earlier conversations say about progress.

## Steps

1. **Day.** Use the day already established in this conversation; otherwise ask. If several planogramas share that day number, ask which one. If the day doesn't exist, say so and stop.
2. **Plan and cards.** Fetch the day's row and query the matching cards (same Etapa). Done when every content item is mapped to a card. If a mapping is ambiguous, ask before step 7.
3. **Read code.** Read the relevant project files (`src/`, `test/`, `.env` example if any). Read only.
4. **Evaluate** each card against the day's Conteúdos and Prática, and nothing else. Done when every mapped card has a verdict with evidence.
5. **Present**, in Portuguese:
   - O que está correto.
   - O que precisa de ajuste — cite `file:line` and the snippet; explain the problem and how to investigate, without the fix.
   - O que falta conferir na prática.
6. **Evidence.** Reading code proves structure, not behaviour. For behaviour the plan requires (status codes, Postman responses, terminal logs, execution order), ask the user for the Postman results or logs. Running the app or tests requires the user's permission first.
7. **Update cards**, each card individually:
   - `Concluído`: every content the card covers is implemented and verified with evidence.
   - `Estudando`: started, with adjustments or verifications pending.
   - `A fazer`: not started.
   A card bundling several contents becomes `Concluído` only when all of them are met. A card already `Concluído` stays so; if the code contradicts it, explain the contradiction and ask before changing it.
8. **Report** which cards changed status (old → new) and which stayed the same.

## Guardrails

- Notion writes are limited to the `Status` of existing cards. Pages, cards, properties and the planograma stay as they are.
- Each day's review covers only that day's cards; the rest of the Etapa keeps its status.
- Requirements come from the day's row only; features from later days or stages are out of scope.
- Project code belongs to the user: never create, edit, fix or format it; no dependency installs or file-changing commands.
