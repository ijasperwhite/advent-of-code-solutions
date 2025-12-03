package weektwo

class DayFive {
    fun partOne(list: List<String>): Long {
        val coordinates = toCoordinates(list)
        val results = (0..100).toList().mapIndexedNotNull { index, _ ->
            println("")
            print("starting $index ... ")

            val start = coordinates.first { it.char == 'S' }
            var visited = listOf(start)
            var current = start
            var invalids = emptyList<Coordinate>()
            var subPaths = mutableListOf<Coordinate>()
            (0 .. 26).toList().map {
                val subResult = findNextSubPath(current, current, coordinates, visited, invalids)
//                subPaths = subPaths + subResult.toMutableList()
            }
//            val result = try {
//                findNext(start, coordinates, visited, invalids)
//            } catch (e: RuntimeException) {
//                null
//            }
//            val result = getPath(coordinates)
//            val size = result?.size
//
//            print(" with size $size")
//            size
        }
//        return results.minByOrNull { it }!!.toLong()
        return 0L
    }

    private fun findNext(
        current: Coordinate,
        coordinates: List<Coordinate>,
        visited: List<Coordinate>,
        invalids: List<Coordinate>
    ): List<Coordinate>? {
        try {
            if (current.char == 'E') return visited

            val shuffled = coordinates.shuffled()
            val next = shuffled.firstOrNull {
                (it.z - current.z in 0..1) &&
                        (Math.abs(current.x - it.x) + Math.abs(current.y - it.y) == 1L) &&
                        !visited.contains(it) && !invalids.contains(it)
            }

            return if (next == null) {
//                throw RuntimeException("failed state")
                val newInvalid = listOf(current) + invalids
                val newVisited = visited.drop(1)
                findNext(visited[1], coordinates, newVisited, newInvalid)
            } else {
                if (next.char != current.char) print(next.char)
                val newVisited = listOf(next) + visited
                findNext(next, coordinates, newVisited, invalids)
            }
        } catch (e: Exception) {
            return null
        }
    }

    private fun findNextSubPath(
        initial: Coordinate,
        current: Coordinate,
        coordinates: List<Coordinate>,
        visited: List<Coordinate>,
        invalids: List<Coordinate>
    ): List<Coordinate>? {
        if (initial.char != current.char) return visited

        val shuffled = coordinates.shuffled()
        val next = shuffled.firstOrNull {
            (it.z - current.z in 0..1) &&
                    (Math.abs(current.x - it.x) + Math.abs(current.y - it.y) == 1L) &&
                    !visited.contains(it) && !invalids.contains(it)
        }

        return if (next == null) {
            val newInvalid = listOf(current) + invalids
            val newVisited = visited.drop(1)
            findNextSubPath(initial,visited[1], coordinates, newVisited, newInvalid)
        } else {
            if (next.char != current.char) print(next.char)
            val newVisited = listOf(next) + visited
            findNextSubPath(initial, next, coordinates, newVisited, invalids)
        }

    }

    fun partTwo(list: List<String>): Long {
        return 0L
    }

    data class Coordinate(
        val x: Long,
        val y: Long,
        val z: Long,
        val char: Char
    )

    private fun toCoordinates(l: List<String>): List<Coordinate> {
        return l.mapIndexed { rowIndex, r ->
            r.mapIndexed { columnIndex, c ->
                val height = when (c) {
                    'S' -> 0L
                    'E' -> 27L
                    else -> c.code - 96L
                }
                Coordinate(rowIndex.toLong(), columnIndex.toLong(), height, c)
            }
        }.flatten()
    }
}