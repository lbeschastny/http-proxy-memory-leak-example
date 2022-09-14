# http-proxy-memory-leak-example

Reproduction example for memory leak in [http-proxy](https://www.npmjs.com/package/http-proxy) when client closes connection prematurely.

Original issues:

 * https://github.com/http-party/node-http-proxy/issues/1586
 * https://github.com/chimurai/http-proxy-middleware/issues/782

## Running locally

Install dependencies:

```sh
npm ci
```

Run the server:

```sh
npm start
```

Start meking requests from TTY:


```sh
while :; do curl -s -I -X GET http://localhost:7000/sample.png > /dev/null; done
```

## Running in dockerized environment

Run docker-compose:

```sh
sudo docker-compose up --build
```

## Memory leak

Running the above code results in a memoy leak and crush the server after a minute or so:

```
> http-proxy-memory-leak-example@1.0.0 prestart
> http-server public -p ${HTTP_SERVER_PORT:-5000} -s &


> http-proxy-memory-leak-example@1.0.0 start
> node --max-old-space-size=128 src/index.js

server is listenning on port 7000
(node:535729) [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated
(Use `node --trace-deprecation ...` to show where the warning was created)
Memory usage: 38.62MB (4.11MB heap, 24.18KB buffers)
Memory usage: 107.71MB (12.43MB heap, 49.72MB buffers)
Memory usage: 312.09MB (30.56MB heap, 198.18MB buffers)
Memory usage: 449.22MB (47.46MB heap, 291.36MB buffers)
Memory usage: 584.92MB (68.47MB heap, 374.63MB buffers)
Memory usage: 714.77MB (90.07MB heap, 459.3MB buffers)

<--- Last few GCs --->
in[535736:0x63ab030]   109731 ms: Mark-sweep 103.6 (138.1) -> 102.8 (138.4) MB, 2.4 / 0.1 ms  (+ 108.6 ms in 1552 steps since start of marking, biggest step 1.0 ms, walltime since start of marking 127 ms) (average mu = 0.186, current mu = 0.190) finalize in[535736:0x63ab030]   109864 ms: Mark-sweep 103.8 (138.4) -> 103.0 (138.6) MB, 2.3 / 0.1 ms  (+ 107.8 ms in 1516 steps since start of marking, biggest step 2.3 ms, walltime since start of marking 125 ms) (average mu = 0.181, current mu = 0.175) finalize in

<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0xb00d90 node::Abort() [node]
 2: 0xa1823b node::FatalError(char const*, char const*) [node]
 3: 0xcedbce v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
 4: 0xcedf47 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
 5: 0xea6105  [node]
 6: 0xea6be6  [node]
 7: 0xeb4b1e  [node]
 8: 0xeb5560 v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [node]
 9: 0xeb6697 v8::internal::Heap::FinalizeIncrementalMarkingIfComplete(v8::internal::GarbageCollectionReason) [node]
10: 0xeba1b0 v8::internal::IncrementalMarkingJob::Task::RunInternal() [node]
11: 0xdabeeb non-virtual thunk to v8::internal::CancelableTask::Run() [node]
12: 0xb6e964 node::PerIsolatePlatformData::RunForegroundTask(std::unique_ptr<v8::Task, std::default_delete<v8::Task> >) [node]
13: 0xb707c9 node::PerIsolatePlatformData::FlushForegroundTasksInternal() [node]
14: 0x155a336  [node]
15: 0x156c7a4  [node]
16: 0x155ac68 uv_run [node]
17: 0xa3dfe5 node::SpinEventLoop(node::Environment*) [node]
18: 0xb42dc6 node::NodeMainInstance::Run(node::EnvSerializeInfo const*) [node]
19: 0xac4812 node::Start(int, char**) [node]
20: 0x7f6700aef083 __libc_start_main [/lib/x86_64-linux-gnu/libc.so.6]
21: 0xa3bf3c  [node]
Aborted (core dumped)
```
