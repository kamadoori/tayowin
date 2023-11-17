# Tayowin

A desktop manga reader meant to interop with Tachiyomi, reading and writing backups in the same manner and having interoperability with their plugins. Not affiliated with Tachiyomi.

## Tachiyomi Backup format

Tachiyomi uses Protobuf to serialize their backups and then GZips them. This makes the backups relatively space-efficient as the protobuf file contains very little space that's not just application data, but it also comes with some caveats. Namely, you need to have the model ready beforehand before you can deserialize the `.proto` file into normal objects. The Tachiyomi repository does not provide this unfortunately.
