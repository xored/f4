//
// Copyright (c) 2010, xored software, Inc.
// Licensed under the Academic Free License version 3.0
//
// History:
//   21 Apr 10  Andrey Talnikov  Initial Contribution
//

**
** UTF8Util
**
internal const class UTF8Util
{
  /*
  UTF-8 strings are encoded so that character sequences that contain only non-null ASCII characters
  can be represented using only 1 byte per character, but characters of up to 16 bits can be represented.
  All characters in the range '\u0001' to '\u007F' are represented by a single byte: 
    0   bits 6-0 
  
  The 7 bits of data in the byte give the value of the character represented. The null character ('\u0000')
  and characters in the range '\u0080' to '\u07FF' are represented by a pair of bytes x and y:
    x: 1  1   0   bits 10-6 
    y: 1  0   bits 5-0 
  The bytes represent the character with the value ((x & 0x1f) << 6) + (y & 0x3f). 
  
  Characters in the range '\u0800' to '\uFFFF' are represented by 3 bytes x, y, and z:
    x: 1  1   1   0   bits 15-12 
    y: 1  0   bits 11-6 
    z: 1  0   bits 5-0 
  The character with the value ((x & 0xf) << 12) + ((y & 0x3f) << 6) + (z & 0x3f) is represented by
  the bytes.
  */

  static Str readString(InStream istream, Int bytesNum)
  {
    StrBuf result := StrBuf(bytesNum)
    Int totalBytesRead := 0

    while (totalBytesRead < bytesNum)
    {
      Int firstByte := istream.readU1
      // one byte
      if (0 == firstByte.and(0x80))
      {
        // x = 0*******
        totalBytesRead++
        result.addChar(firstByte)
      }
      else if (0xC0 == firstByte.and(0xE0))
      {
        // x = 110*****
        totalBytesRead += 2
        if (totalBytesRead > bytesNum) throw FormatErr()

        Int secondByte := istream.readU1
        if (0x80 != secondByte.and(0xC0)) throw FormatErr()
        // y = 10******
        result.addChar(firstByte.and(0x1F).shiftl(6).or(secondByte.and(0x3F)))
      }
      else if (0xE0 == firstByte.and(0xE0))
      {
        // x = 111*****
        totalBytesRead += 3
        if (totalBytesRead > bytesNum) throw FormatErr()

        Int secondByte := istream.readU1
        if (0x80 != secondByte.and(0xC0)) throw FormatErr()
        // y = 10******
        Int thirdByte := istream.readU1
        if (0x80 != thirdByte.and(0xC0)) throw FormatErr()
        // z = 10******
        result.addChar(
          firstByte.and(0xF).shiftl(12).
          or(secondByte.and(0x3F).shiftl(6)).
          or(thirdByte.and(0x3F)))
      }
      else
      {
        throw FormatErr()
      }
    }

    return result.toStr
  }
}
