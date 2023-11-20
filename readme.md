# Tayowin

A desktop manga reader meant to interop with Tachiyomi, reading and writing backups in the same manner and having interoperability with their plugins. Not affiliated with Tachiyomi.

**NOTE:** Currently this only serves as a very simple backup viewer. It's nowhere near ready for using it as anything other than that.

## Tachiyomi Backup format

Tachiyomi uses Protobuf to serialize their backups and then GZips them. This makes the backups relatively space-efficient as the protobuf file contains very little space that's not just application data, but it also comes with some caveats. Namely, you need to have the model ready beforehand before you can deserialize the `.proto` file into normal objects. The Tachiyomi repository does not provide this unfortunately.

To get these `.proto` files, you can use https://github.com/clementd64/tachiyomi-backup-models to generate an outline of the message structure. You have to edit the code and resulting `.proto` files a little before using them though; simply remove the code that checks if the type is in the definitions in `generator.ts` and check for any syntax errors. A copy of the `.proto` schema I generated with that software is found at `src/assets/schema/schema.proto`.

To generate the TypeScript schema from the `.proto` files, this application uses [@protobuf-ts](https://github.com/timostamm/protobuf-ts). The (slightly edited and formatted) generated Typescript files for this project are found in `src/generated/schema.ts`.
